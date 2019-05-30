import React, { Component } from 'react';

import FormGroup from './FormGroup.jsx';

import { getPropsThroughKey } from '../../../helpers/index';
import checkValidation from '../../../helpers/validation';

export default class Form extends Component {

  renderFormElements () {
    const formElements = [];

    for (let fieldName in this.props.fieldOptions) {
      const field = this.props.fieldOptions[fieldName];

      if (!field.formField || field['no' + this.props.formType]) {
        continue;
      }

      const uniqueKey = this.props.id + fieldName;
      const placeholder = field.placeholder || field.name + '...';
      const labelText = field.labelText || field.name;

      formElements.push(
        <FormGroup
          key={uniqueKey}
          id={uniqueKey}
          onChange={this.props.updateForm}
          placeholder={placeholder}
          labelText={labelText}
          fieldName={fieldName}
          {...field}
          {...this.props.formState.fields[fieldName]}
        />
      );
    }

    return formElements;
  }
  
  onSubmit (e) {
    e.preventDefault();
    const formValues = getPropsThroughKey(this.props.formState.fields, 'value');
    const validationResults = checkValidation(formValues, this.props.fieldOptions);

    this.props.updateForm(validationResults.fields);
    
    if (!validationResults.isValid) {
      return;
    }

    this.props.onSubmit(formValues);
  }

  render () {
    const formElements = this.renderFormElements();

    const heading = <h4>{this.props.formHeading}</h4>
    
    let afterSubmitError = null;
    if (this.props.afterSubmitError) {
      afterSubmitError = <span className="redish">{this.props.afterSubmitError}</span>;
    }

    const submitButtonClasses = ['btn btn-primary'].concat(this.props.submitButtonClasses).join(' ');
    const formClasses = [''].concat(this.props.formClassNames).join(' ');
    
    return (
      <form onSubmit={this.onSubmit.bind(this)} className={formClasses}>
        {heading}
        {afterSubmitError}
        {formElements}
        <button className={submitButtonClasses}>{this.props.submitButtonText}</button>
      </form>
    );
  }
}
