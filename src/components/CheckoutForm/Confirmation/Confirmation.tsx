import "./../CheckoutForm.scss";
import FormCheckbox from "./../FormElements/FormCheckbox";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";

type Props = {
  isFormValid: boolean;
};

function Confirmation({ isFormValid }: Props) {
  return (
    <div className="checkout-form__confirmation">
      <div className="checkout-form__header-section">
        <h2>Confirmation</h2>
        <span>
          We are getting to the end. Just few clicks and your order si ready!
        </span>
      </div>
      <div className="checkout-form__checkboxes">
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
        className="checkout-form__btn-confirm"
        disabled={!isFormValid}
      >
        Complete Order
      </PrimaryBtn>
    </div>
  );
}

export default Confirmation;
