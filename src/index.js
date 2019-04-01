function createHardThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        // regular one way data flow - avoid flow break - state change first
        next(action);

        // execute thunk creator with state as first argument and dispatch new action with results
        if (typeof action.thunk === 'function') {
            return dispatch({
                ...{ type: action.type + '_THUNK' },
                ...action.thunk(getState(), extraArgument),
            });
        }
    };
}

const thunk = createHardThunkMiddleware();
thunk.withExtraArgument = createHardThunkMiddleware;

export default thunk;
