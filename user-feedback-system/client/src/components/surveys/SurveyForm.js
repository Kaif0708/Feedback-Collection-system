//import _ from "loadash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmail from "../../utils/validateEmail";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ name, label }) => {
      return (
        <Field
          type="text"
          label={label}
          name={name}
          component={SurveyField}
          key={name}
        />
      );
    });
  }
  //   renderFields() {
  //     return _.map(FIELDS, ({ name, label }) => {
  //       return (
  //         <Field type="text" label={label} name={name} component={SurveyField} />
  //       );
  //     });
  //   }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}

          <Link to="/surveys" className=" red white-text  btn-flat">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  errors.recipients = validateEmail(values.recipients || "");
  formFields.forEach(({ name, valueError }) => {
    if (!values[name]) {
      errors[name] = valueError; //"You must have to provide a value";
    }
  });

  //   if (!values.title) {
  //     errors.title = "You have not provided a title for survey";

  //   }
  return errors;
}
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
