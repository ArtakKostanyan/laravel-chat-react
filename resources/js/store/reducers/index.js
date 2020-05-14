const initialState = {

    userId:0,
    message:[]
};

export default function rootReducer(state = initialState, action) {
     switch (action.type) {
        case'userId': {
            return {
                ...state,
                userId: action.payload
            }

        }
        case'message': {
            return {
                ...state,
                message: action.first ?[...action.payload]: [... state.message, ...action.payload]
            }

        }
        default: {
            return state;
        }
    }
}
