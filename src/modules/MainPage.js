import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defaultNewsTabs } from "../constants";
import HeaderWithTabs from "../components/Header";
import GeneralNews from "./GeneralNews";
import PersonalizedNews from "./PersonalizedNews";

function MainPage() {
  const [tabs, setTabs] = useState(defaultNewsTabs);

  const onCurrentTabChange = (tab) => {
    setTabs((prevTabs) =>
      prevTabs.map((t) => ({
        ...t,
        current: t.name === tab,
      }))
    );
  };

  return (
    <>
      <ToastContainer />
      <HeaderWithTabs tabs={tabs} onCurrentTabChange={onCurrentTabChange} />

      {tabs[0].current == true && <GeneralNews />}
      {tabs[1].current == true && <PersonalizedNews />}
    </>
  );
}

export default MainPage;
