import React from "react";
import Typed from "react-typed";

export default function InnerHome() {
  // var typed = new Typed(".typing", {
  //   strings: ["WORD", "EXSEL", "Power point", "Kampyuter asoslari"],
  // typeSpeed: 100,
  // backSpeed: 70,
  // loop: true,
  // });
  return (
    <section class="home" id="home">
      <div class="content">
        <h3>
          best mobile app <span>showcase</span>
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          suscipit porro nam libero natus error consequatur sed repudiandae eos
          quo?
        </p>

        <h3 class="type__text">
          <Typed
            strings={["WORD", "EXSEL", "Power point", "Kampyuter asoslari"]}
            typeSpeed={100}
            backSpeed={70}
            loop={true}
          />
        </h3>
        <h2 class="type__text">o'rgatiladi</h2>
      </div>

      <div class="image">
        <img src="https://covid.azimedhospital.uz/wp-content/uploads/2021/05/герб_Узб_вектор-01.png" />
      </div>
    </section>
  );
}
