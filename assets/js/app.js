$(function () {
  var urlPaths = window.location.pathname; // url actual

  // Iniciación de la lista en dahsboard
  if(urlPaths === '/'){
    getListAsotiationTC();
  }

  /**
   * [getListAsotiationTC description]
   * @return {[type]} [description]
   */
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
        // Para saber si no tienen profesores inscritos
        if(!data.length){
          relationTeacherCursos.html(`<p>No hay profesores Agregados</p>`);
        }else{

          // Inicio una lista
          relationTeacherCursos.html(`<ul id="listRel"></ul>`);

          // Imprimo la lista de profesores
          data.forEach(itT => {
            // Llamo la funcion de profesores
            printToDisplayDashboardList(itT);

            // console.log(itT.cursos);
            // Imprimo todos los cursos del profesor que tenga inscritos
            itT.cursos.forEach(itC => {
              printToDisplayDashboardListSub(itC, itT);
            });
          });
        }
      }
    });
  }

  /**
   * [printToDisplayDashboardList description]
   * @param  {[type]} dT [description]
   * @return {[type]}    [description]
   */
  function printToDisplayDashboardList(dT) {
    let list = $('#relationTeacherCursos ul#listRel');
    list.append(`<li id="liT-${dT.id}">${dT.name} ${dT.documentId} ${dT.cursos.length} <ul id="listC-${dT.id}"></ul> </li>`);
  }

  /**
   * [printToDisplayDashboardListSub description]
   * @param  {[type]} dC [description]
   * @param  {[type]} dT [description]
   * @return {[type]}    [description]
   */
  function printToDisplayDashboardListSub(dC, dT) {
    let list = $(`li ul#listC-${dT.id}`);
    list.append(`<li id="liC-${dC.id}">${dC.nameCurso}</li>`);
  }



  // Iniciación de la lista en Profesores
  if(urlPaths === '/pro'){
    getListProfesoresSee();
  }

  /**
   * [getListProfesoresSee description]
   * @return {[type]} [description]
   */
  function getListProfesoresSee(){

  }
});
