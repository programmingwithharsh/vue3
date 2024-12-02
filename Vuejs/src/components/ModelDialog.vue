<template>
  <div
    class="modal fade"
    :id="modalTarget"
    tabindex="-1"
    :aria-labelledby="modalTarget + 'Label'"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-5" :id="modalTarget + 'Label'">
            {{ title }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModel"
          ></button>
        </div>
        <div class="modal-body">{{ body }}</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            :data-bs-dismiss="dismissModal"
          >
            {{confirmBtnName}}
          </button>
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModelDialog",
  props: {
    modalTarget: String,
    title: String,
    body: String,
    Delete: String,
    dismissModal: String,
    confirmBtnName: String,
  },
};
</script>