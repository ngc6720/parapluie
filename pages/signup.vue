<script setup lang="ts">

</script>

<template class="page">

    <section>
        <h1>Sign up</h1>
        <form id="signup-form">
            <label>
                Username (required)
                <!-- <span id="uername-description">Please enter a username</span> -->
                <input type=name required aria-describedby="name-validation"
                    placeholder="Please enter a new username..." pattern="[a-zA-Z0-9À-ž\s\-_]{1,}" maxlength="28">
            </label>
            <label>
                Password (required)
                <!-- <span id="password-description">Please enter a new password</span> -->
                <input id="input-password" name="input-password" type="password" required spellcheck="false"
                    aria-describedby="input-password" autocomplete="new-password" autocapitalize="none"
                    placeholder="Please enter a new password...">
            </label>
            <button type="button" aria-controls="input-password" aria-label="Show password" hidden>
                Show
            </button>
            <button>Sign up</button>
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

#form-description {
    /* color: var(--color-error); */
}

form>button {
    font-size: var(--font-size-l);
    border: 1px solid currentColor;
    padding: var(--padding-c);
}

@media screen and (max-width: 45rem) {
    form {
        padding: var(--padding-a) 0;
    }
}
</style>
