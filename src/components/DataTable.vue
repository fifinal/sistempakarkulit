<template>
    <div class="table-responsive">
      <table id="add-row" class="display table table-striped table-hover">
        <thead>
          <tr>
            <th>{{forms[0].label}}</th>
            <th>{{forms[1].label}}</th>
            <th>{{forms[2].label}}</th>
            <th style="width: 10%">Action</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>{{forms[0].label}}</th>
            <th>{{forms[1].label}}</th>
            <th>{{forms[2].label}}</th>
            <th>Action</th>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td>Tiger Nixon</td>
            <td>System Architect</td>
            <td>Edinburgh</td>
            <td>
              <div class="form-button-action">
                <button
                  type="button"
                  data-toggle="tooltip"
                  title
                  class="btn btn-link btn-primary btn-lg"
                  data-original-title="Edit Task"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  type="button"
                  data-toggle="tooltip"
                  title
                  class="btn btn-link btn-danger"
                  data-original-title="Remove"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

</template>
<script>
import Modal from "@/components/Modal.vue";
export default {
  components:{Modal},
  props:{
    forms:{
      require:true
    }
  },
  data() {
    return {
      id:'addRowModals',
      tampil: true
    };
  },
  created() {},
  mounted() {
    $("#add-row").DataTable({
      pageLength: 5
    });
  },
  methods: {
     add() {
      // var action = '<td> <div class="form-button-action"> <button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task"> <i class="fa fa-edit"></i> </button> <button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-danger" data-original-title="Remove"> <i class="fa fa-times"></i> </button> </div> </td>'
      // $('#add-row').dataTable().fnAddData([
      //   $('#addName').val(),
      //   $('#addPosition').val(),
      //   $('#addOffice').val(),
      //   action
      // ])
      console.log(this.forms[0].model);
      
      $('#'+this.id).modal('hide')
    }
  }
};
</script>