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
      // console.log(data);
      // console.log(res);
      // en caso de que no halla un problema este lo pueda resolver
      if(res.statusCode !== 200){
        console.error(res.error);
      }else{
          relationTeacherCursos.html(`<ul id="listRel"></ul>`);

          data.forEach(itT => {
            printToDisplayDashboardList(itT);

            console.log(itT.cursos);
            itT.cursos.forEach(itC => {
              printToDisplayDashboardListSub(itC, itT);
            });

        });
      }
    });
  }

  function printToDisplayDashboardList(dT) {
    let list = $('#relationTeacherCursos ul#listRel');
    list.append(`<li id="liT-${dT.id}">${dT.name} ${dT.documentId} <ul id="listC-${dT.id}"></ul> </li>`);
  }

  function printToDisplayDashboardListSub(dC, dT) {
    let list = $(`li ul#listC-${dT.id}`);
    list.append(`<li id="liC-${dC.id}">${dC.nameCurso}</li>`);
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
