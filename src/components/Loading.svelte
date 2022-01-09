<script>
</script>



<template>
    <div class="main-preloader">
      <div class="main-preloader__ship">
        <img src='./img/icons/ship.svg' alt="starship">
        <div class="main-preloader__boost">
          <div class="main-preloader__boost-B"></div>
          <div class="main-preloader__boost-M"></div>
          <div class="main-preloader__boost-S"></div>
        </div>
      </div>
    </div>
  </template>
  

  
  <style lang="scss">
  $boost-color:#6EF6FF;

  .main{
    &-preloader{
      position: relative;
      &__ship{
        z-index: 2;
        top: 50%;
        left: 45%;
        padding-right: 7%;
        position: absolute;
        animation: 2.2s linear 0s normal none infinite running rotateShip;
        margin: 0 auto;
      }
      &__boost{
        &-B{
          animation: 0.7s linear 0s normal none infinite running boostB;
          width: 13.63px;
          height: 2px;
          background: $boost-color;
          margin: 0 auto;
          margin-top: 2px;
        }
        &-M{
          animation: 0.7s linear 0s normal none infinite running boostM;
          width: 11.19px;
          height: 2px;
          background: $boost-color;
          opacity: 0.4;
          margin: 0 auto;
          margin-top: 2px;
        }
        &-S{
          animation: 0.7s linear 0s normal none infinite running boostS;
          width: 8.76px;
          height: 2px;
          background: $boost-color;
          opacity: 0.1;
          margin: 0 auto;
          margin-top: 2px;
        }
      }
    }
  }
  
  
  //Animation Ship
  @keyframes rotateShip {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  @media (max-width: 710px) {
    .main-preloader {
      transform: rotate(90deg);
    }
    @keyframes rotateShip {
    0% {
      transform: translateY(200px);
    }
    100% {
      transform: translateY(-200px);
    }
  }
  }


  //Animation Boost
  
  @keyframes boostB {
    0%{
      opacity: 0.1;
    }
    50%{
      opacity: 0.4;
    }
    100%{
      opacity: 1;
    }
  }
  
  @keyframes boostM {
    0%{
      opacity: 0.4;
    }
    50%{
      opacity: 0.1;
    }
    100%{
      opacity: 1;
    }
  }
  
  @keyframes boostS {
    0%{
      opacity: 1;
    }
    50%{
      opacity: 0.4;
    }
    100%{
      opacity: 0.1;
    }
  }
  
  </style>