import { React } from 'react';

const CreateTodo = (props) => {
    <div>
        <form>

            <div className="form-group" >
                <div className="row">
                    <input id="title" />
                </div>
            </div>

            <div className="form-group">
                <div className="row">
                    <input id="summary" />
                </div>
            </div>
            
            <div className="form-group">
                <div className="row">
                    <input id="date" />
                </div>
            </div>

            <div className="form-group">
                <div className="row">
                    <input id="time" />
                </div>
            </div>

            <div className="form-group">
                <div className="row">
                    <button className="btn btn-lg btn-primary">Create</button>
                </div>
            </div>
            
        </form>
    </div>
}

export default CreateTodo;