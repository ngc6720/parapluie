<script setup lang="ts">

</script>

<template class="page">
    <section>
        <h1>Log in</h1>
        <form id="login-form">
            <label>
                Username (required)
                <!-- <span id="uername-description">Please enter your username</span> -->
                <input type=name required aria-describedby="name-validation" placeholder="Please enter your username..."
                    pattern="[a-zA-Z0-9À-ž\s\-_]{1,}" maxlength="28">
            </label>
            <label>
                Password (required)
                <!-- <span id="password-description">Please enter your password</span> -->
                <input id="input-password" name="input-password" type="password" required spellcheck="false"
                    aria-describedby="input-password" autocomplete="current-password" autocapitalize="none"
                    placeholder="Please enter your password...">
            </label>
            <button type="button" aria-controls="input-password" aria-label="Show password" hidden>
                Show
            </button>
            <button>Log in</button>
            <span id="form-description">/!\ This is a dummy form for practicing purpose that will not submit
                anything</span>
        </form>
    </section>

</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: var(--padding-a);
    padding: 0;
}

h2 {
    font-size: var(--font-size-xl);
}

input {
    font-size: var(--font-size-l);
    padding: var(--padding-c);
    width: 100%;
    margin-top: var(--padding-c);
    /* background-color: var(--color-surface); */
    pointer-events: auto;
}

button {
    /* background-color: var(--color-surface); */

}

label {
    display: flex;
    flex-direction: column;
    font-size: var(--font-size-m);
    user-select: none;
    pointer-events: none;
}

span {
    color: var(--color-text-b);
    font-size: var(--font-size-s);
}

form>button {
    font-size: var(--font-size-l);
    border: 1px solid currentColor;
    padding: var(--padding-c);
}

#form-description {
    /* color: var(--color-error); */
}

@media screen and (max-width: 45rem) {
    form {
        padding: var(--padding-a) 0;
    }
}
</style>