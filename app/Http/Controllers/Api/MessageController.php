<?php

namespace App\Http\Controllers\Api;

use App\Events\MyEvent;
use App\Http\Controllers\Controller;
use App\Jobs\SendEmail;
use App\Message;
use App\User;
use Illuminate\Http\Request;
use Pusher\Pusher;

class MessageController extends Controller
{
    public function index(Request $request)
    {

        $my_id = request()->get('my');
        $user_id = request()->get('user');

        Message::where(['from' => $user_id, 'to' => $my_id])->update(['is_read' => 1]);

        // Get all message from selected user
        $messages = Message::where(function ($query) use ($user_id, $my_id) {
            $query->where('from', $user_id)->where('to', $my_id);
        })->oRwhere(function ($query) use ($user_id, $my_id) {
            $query->where('from', $my_id)->where('to', $user_id);
        })->get();


        return response()->json([
            'ok' => true,
            'messages' => $messages

        ]);
    }

    public function sendMessage(Request $request)
    {
        $from = $request->get('my');
        $to = $request->get('receiver_id');
        $message = $request->get('text');

        $data = new Message();
        $data->from = $from;
        $data->to = $to;
        $data->message = $message;
        $data->is_read = 0;
        $data->save();



        event(new MyEvent($data));

        $user=User::find($from);

        SendEmail::dispatch($user);




    }
}
