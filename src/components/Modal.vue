<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header no-bd">
          <h5 class="modal-title">
            <span class="fw-mediumbold">New</span>
            <span class="fw-light">Row</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <p class="small">Create a new row using this form, make sure you fill them all</p>
          <form>
            <div class="row">
              <div class="col-sm-12" v-for="(form, index) in forms" :key="index">
                <div class="form-group form-group-default">
                  <label>{{form.label}}</label>
                  <input
                    v-model="form.model"
                    :type="form.type"
                    class="form-control"
                    placeholder="fill name"
                  >
                </div>
              </div>
            </div>
          </form>
          </div>
        <div class="modal-footer no-bd">
        <button type="button" @click="add" id="addRowButton" class="btn btn-primary">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
   props:{
    id:{ //nama sesuai dengan atribut saat mengirim data
      require:true
    }
  },
	 methods: {
    add () {
      // var action = '<td> <div class="form-button-action"> <button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task"> <i class="fa fa-edit"></i> </button> <button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-danger" data-original-title="Remove"> <i class="fa fa-times"></i> </button> </div> </td>'
      // $('#add-row').dataTable().fnAddData([
      //   $('#addName').val(),
      //   $('#addPosition').val(),
      //   $('#addOffice').val(),
      //   action
      // ])
      // $('#addRowModal').modal('hide')
    }
  }
}
</script>