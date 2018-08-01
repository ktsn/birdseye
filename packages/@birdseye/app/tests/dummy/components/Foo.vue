<template>
  <p class="message">{{ foo + ' ' + bar }}</p>
</template>

<script>
export default {
  name: 'Foo',

  props: {
    foo: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      bar: ''
    }
  }
}
</script>

<birdseye>
{
  "name": "Foo component",
  "patterns": [
    {
      "name": "Normal",
      "props": {
        "foo": "foo value"
      },
      "data": {
        "bar": "bar value"
      }
    },
    {
      "name": "Bar number",
      "props": {
        "foo": "string"
      },
      "data": {
        "bar": 12345
      }
    }
  ]
}
</birdseye>
