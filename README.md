#### redux thunk hardway

##### difference with original redux-thunk

* delayed execution - the thunk is executed after reducer produce new state
*  no arguments required by thunk
    *  state is bound via closure
* thunk returns action to run, not dispatch call
