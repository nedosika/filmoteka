import React from "react";
import FormBuilder, {FIELDS} from "./components/FormBuilder";
import {VALIDATION_TYPES} from "./components/FormBuilder/components/Validator";

function App() {
    const handleSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
            <FormBuilder
                onSubmit={handleSubmit}
                config={{
                    fields: [
                        {
                            [FIELDS.text.props.type]: FIELDS.text.type,
                            [FIELDS.text.props.name]: 'title',
                            [FIELDS.text.props.label]: 'Title:',
                            [VALIDATION_TYPES.validation]: {
                                [FIELDS.text.validators.minLength]: 2,
                                [FIELDS.text.validators.maxLength]: 10
                            }
                        },
                        {
                            [FIELDS.text.props.type]: FIELDS.text.type,
                            [FIELDS.object.props.name]: 'ipAddresses',
                            [FIELDS.object.props.title]: 'IP Addresses: '
                        }
                    ]
                }}/>
        </div>
    );
}

export default App;
