function createHardThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        // regular one way data flow - avoid flow break - state change first
        next(action);

        // execute thunk creator with state as first argument and dispatch new action with results
        if (typeof action.thunk === 'function') {
            return dispatch({
                // make default type with respect to origin action type
                ...{ type: action.type + '_THUNK' },
                // add any data returned by thunk, possible to overwrite action.type
                ...action.thunk(getState(), extraArgument),
            });
        }
    };
}

const thunk = createHardThunkMiddleware();
thunk.withExtraArgument = createHardThunkMiddleware;

export default thunk;
