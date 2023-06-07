export const InitialState = {
    layout : false
}

export const AuthReducer = (InitialState, action) => {
    switch (action.type) {
        case 'Without_Header' : 
        return {
            layout : true,
        }
        case 'With_Header' :
        return {
            layout : false,
        }
        default :
        return {
            ...InitialState
        }
    }
}