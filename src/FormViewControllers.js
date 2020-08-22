'use strict';

// Суперкласс контроллера html-формы, описывающий общее поведение форм
//
class FormViewController {
  constructor(formIdentifier) {
    this.formIdentifier = formIdentifier;

    const self = this;
    this.form.on("submit", function(event) {
      event.preventDefault();
      self.enterLoadingState();
      self.sendForm();
    });
  }

  sendForm() {
    throw "Imlpement 'sendForm' method in your subclass";
  }

  enterLoadingState() {
    this.submitButton
      .attr("disabled", true)
      .width(`${this.submitButton.width()}px`);
    this.submitButton.find(".text").addClass("d-none");
    this.submitButton.find(".spinner").removeClass("d-none");
  }

  leaveLoadingState() {
    this.submitButton.find(".text").removeClass("d-none");
    this.submitButton.find(".spinner").addClass("d-none");
    this.submitButton
      .width(false)
      .attr("disabled", null);
  }

  get form() {
    return $(this.formIdentifier);
  }
  get submitButton() {
    if (!this._submitButton) {
      this._submitButton = $(`${this.formIdentifier} button[type='submit']`);
    }
    return this._submitButton;
  }
}


// Контроллер главной формы — подачи заявки
//
class MainFormViewController extends FormViewController {
  constructor() {
    super("form[name='main-form']");
  }

  sendForm() {
    // Этот метод вызывается из form.on(submit, ...) сразу после enterLoadingState

    const self = this;

    // TODO: send the form with an ajax call...

    // TODO: remove the timeout, this goes inside the callback function
    setTimeout(function(error = null) {
      // error = null; // TODO: remove this

      self.leaveLoadingState();
      self.displayResult(error);
    }, 500);
  }

  enterLoadingState() {
    $("#main-form-result-failed").addClass("d-none");
    $("#main-form-result").addClass("d-none");
    super.enterLoadingState();
  }

  displayResult(error) {
    $("#main-form-policy").addClass("d-none");
    if (error) {
      $("#main-form-result-failed").removeClass("d-none");
    } else {
      $("#main-form-result").removeClass("d-none");
    }
  }
}


// Контроллер формы проверки адреса на возможность подключения
//
class CheckAddressFormViewController extends FormViewController {
  constructor() {
    super("form[name='check-address']");
  }

  sendForm() {
    // Этот метод вызывается из form.on(submit, ...) сразу после enterLoadingState

    const self = this;

    // TODO: send the form with an ajax call...

    // TODO: remove the timeout, this goes inside the callback function
    setTimeout(function(error = null) {
      const result = true; // true -- адрес найден, false -- адрес не найден

      self.leaveLoadingState();
      self.displayResult(error, result);
    }, 500);
  }

  enterLoadingState() {
    $("#check-address-form-result-error").addClass("d-none");
    $("#check-address-form-result-positive").addClass("d-none");
    $("#check-address-form-result-negative").addClass("d-none");
    super.enterLoadingState();
  }

  displayResult(error, result) {
    if (error) {
      $("#check-address-form-result-error").removeClass("d-none");
    } else if (result === true) {
      $("#check-address-form-result-positive").removeClass("d-none");
    } else {
      $("#check-address-form-result-negative").removeClass("d-none");
    }
  }
}
