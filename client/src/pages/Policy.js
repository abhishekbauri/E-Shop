import React from "react";
import Layout from "../components/layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>
            Secure Transactions: Your payment information is safeguarded with
            industry-standard encryption for a secure shopping experience.
          </p>
          <p>
            Data Confidentiality: We strictly protect your personal details,
            ensuring confidentiality and refraining from sharing or selling
            information to third parties.
          </p>
          <p>
            Opt-In Communication: Choose to receive only relevant updates by
            opting in for newsletters and promotional emails based on your
            preferences.
          </p>
          <p>
            Account Security: Robust measures are in place to secure your
            account, including password protection and the option for two-factor
            authentication.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
