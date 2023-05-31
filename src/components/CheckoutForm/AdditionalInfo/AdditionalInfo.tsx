import "./../CheckoutForm.scss";
import FormTextArea from "./../FormElements/FormTextArea";

function AdditionalInfo() {
  return (
    <div className="additional-info__container">
      <div className="checkout-form__header-section">
        <h2>Additional informations</h2>
        <span>Need something else? We will make it for you!</span>
      </div>
      <FormTextArea name="additionalInfo" />
    </div>
  );
}

export default AdditionalInfo;
