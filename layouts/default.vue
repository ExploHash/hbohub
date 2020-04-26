<template>
  <a-layout>
    <a-layout-header class="header">
      <nav>
        <div class="logo"><span>Hbo</span><span>Hub</span></div>
        <a-menu theme="white" mode="horizontal">
          <a-menu-item @click="$router.push('/')" key="1">Home</a-menu-item>
          <a-menu-item @click="$router.push('/favourites')" key="2">Favorieten</a-menu-item>
        </a-menu>
      </nav>
    </a-layout-header>
    <a-layout-content>
      <nuxt />
    </a-layout-content>
  </a-layout>
</template>

<style>

body {
  font-size: 16px;
  word-spacing: 1px;
  box-sizing: border-box;
}

main {
  padding: 70px 15%;
}

.ant-layout-header{
  background: white;
  padding: 0px;
}

.ant-layout {
  background: white;
}

header {
  position: fixed;
  background-color: white;
  width: 100%;
  z-index: 99;
  height: auto;
}

.logo {
  font-size: 35px;
  line-height: 45px;
  font-family: arial;
  width: 130px;
  float: left;
  height: 45px;
  margin-right: 40px;
  background-size: auto 45px;
  margin-left: calc(15% - 25px);
  font-weight: 700;
  text-decoration: underline;
}

.logo span:nth-child(1){
  color: black;
}

.logo span:nth-child(2){
  color: #1890ff;
}
</style>
