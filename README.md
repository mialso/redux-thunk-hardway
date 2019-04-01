#### redux thunk hardway

##### Motivation

* action is plain js object, thunk is regular action creator to produce action
> try to avoid any check by action itself
> like `if (typeof action === 'function')` to avoid run into rabbit hole of action being whatever you want

* thunk is action delayed - thunk-action data calculation happens after state is updated by originated action
* make UI react to action and then calculate-run any other stuff

##### difference with original redux-thunk

* delayed execution - the thunk is executed after reducer produce new state
* last state is given to thunk as first argument
* thunk returns action to dispatch


example:
```
const myThunk = state => ({
    payload: state.data.primitiveValue,
});

const myActionCreator = myVal => ({
    type: 'MY_ACTION',
    payload: myVal,
    thunk: myThunk,
});

// if later call an action
dispatch(myActionCreator('someValue'));

// regular data flow for action - with middleware is applied
/*
{
    type: 'MY_ACTION',
    payload: 'componentKnownValue', // this value is taken ui component
}
*/

// with reducer and possibly new state
// new state render happens
// and then next thunk action is dispatched

/*
{
    type: 'MY_ACTION_THUNK',
    payload: 'primitiveValue', // this value is taken from recent available state
}
*/
```
