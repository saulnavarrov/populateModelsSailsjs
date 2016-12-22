$(function () {
  var urlPaths = window.location.pathname; // url actual

  if(urlPaths === '/'){
    getListAsotiationTC();
  }

  function getListAsotiationTC(){
    let relationTeacherCursos = $('#relationTeacherCursos');

    io.socket.request({
      'method': 'get',
      'url': '/profesores',
      'data': {},
      'headers': {}
    }, (data, res) => {
      console.log(data);
      console.log(res);
      // en caso de que no halla un problema este lo pueda resolver
      if(res.statusCode !== 200){
        console.error(res.error);
      }else{

        data.forEach(it => {
          printToDisplayDashboardList(it);
        });
      }
    });
  }

  function printToDisplayDashboardList(d) {
    console.log(d);
  }
});

/**
 io.socket.request({
      method: 'get',
      url: `/api/colors?where={"selectForJob":true}`,
      data: {}, headers: {'x-csrf-token': 'ji4brixbiub3', 'Authorization': 'Bearer ' + jwtToken,}
    }, (data, res) => {
      $('#listColorsDashBoard').html('');//Clear Display
      $('#dashboarProgressColor').html('');
      data.forEach((it, id) => {
        setPrintDisplayColorsDashboard(it, id);
      });
    });
 */
