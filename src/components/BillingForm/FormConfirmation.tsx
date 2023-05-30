import "./BillingForm.scss";
import FormCheckbox from "./FormElements/FormCheckbox";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";

type Props = {
  isFormValid: boolean;
};

function FormConfirmation({ isFormValid }: Props) {
  return (
    <div className="billing-form__confirmation">
      <div className="billing-form__section-header">
        <h2>Confirmation</h2>
        <span>
          We are getting to the end. Just few clicks and your order si ready!
        </span>
      </div>
      <div className="billing-form__checkboxes">
        <FormCheckbox
          name="agreementNewsletter"
          title="I agree with sending an Marketing and newsletter emails. No spam, promissed!"
        />
        <FormCheckbox name="agreementPrivacyPolicy">
          <span>
            I agree with our&nbsp;<a href="#"> terms and conditions</a>
            &nbsp;and&nbsp;
            <a href="#">privacy policy</a>.
          </span>
        </FormCheckbox>
      </div>
      <PrimaryBtn
        type="submit"
        className="billing-form__btn-confirm"
        disabled={!isFormValid}
      >
        Complete Order
      </PrimaryBtn>
    </div>
  );
}

export default FormConfirmation;
