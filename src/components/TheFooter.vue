<script lang="ts" setup>
// TypeScript logic can be added here if needed
</script>

<template>
  <footer>
    <div class="footer-content container">
      <section>
        <h3>Get to Know Us</h3>
        <ul>
          <li>About Us</li>
          <li>Careers</li>
          <li>Press Releases</li>
        </ul>
      </section>

      <section>
        <h3>Make Money with Us</h3>
        <ul>
          <li>Sell on Amazon</li>
          <li>Sell Under Amazon Accelerator</li>
          <li>Become an Affiliate</li>
        </ul>
      </section>

      <section>
        <h3>Follow Us On</h3>
        <ul>
          <li>Twitter</li>
          <li>Facebook</li>
          <li>Youtube</li>
        </ul>
      </section>

      <section>
        <h3>Amazon Payment Products</h3>
        <ul>
          <li>Amazon Business Card</li>
          <li>Shop with Points</li>
          <li>Reload Your Balance</li>
        </ul>
      </section>
    </div>
  </footer>
</template>

<style>
footer {
  background-color: #232f3e;
  color: #fff;
  padding: 20px 0;
  font-size: 14px;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
}

section {
  flex: 1;
  margin-right: 20px;
}

h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 8px;
  cursor: pointer;
}
</style>
