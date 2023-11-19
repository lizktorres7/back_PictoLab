var express = require("express");
var cors = require("cors");
const { sequelize } = require("../database/conf");

class Server {
  constructor() {
    //DECLARACION DE VARIABLES
    this.app = express();
    
    //DEFINE ROUTES FOR API REST
    this.port = process.env.PORT;
    this.userPath = "/api/user";
    this.authPath = "/api/auth";
    this.activityPath = "/api/activity";
    this.categoryPath = "/api/category";
    this.childrenPath = "/api/children";
    this.classroomPath = "/api/classroom";
    this.dashboardPath = "/api/dashboard";
    this.daybookPath = "/api/daybook";
    this.menuPath = "/api/menu";
    this.pictogramPath = "/api/pictogram";
    this.synonymPath = "/api/synonym";
    this.daybookteacherPath = "/api/daybookteacher"
    this.rolePath = "/api/role";
    this.institutionPath = "/api/institution";
    this.storagePath = "/api/storage";
    this.teacherPath = "/api/teacher";
    this.tutorPath = "/api/tutor";
    


    //CONECTAR BASE DE DATOS
    this.conectionDB();

    //MIDDELWARE
    this.middelwares();

    //RUTAS
    this.routes();
  }

  async conectionDB() {
    await sequelize.sync();
  }

  middelwares() {
    //CORS
    this.app.use(cors());
    //LECTURA Y PARCEO DEL BODY
    this.app.use(express.json());
    //DIRECTORIO PUBLICO
    this.app.use(express.static("public"));
    //DIRECTORIO PUBLICO DE PICTOGRAMAS
    this.app.use(express.static("picto_storage"))
  }

  routes() {
    this.app.use(this.authPath, require("../main/auth/auth.routers"));
    this.app.use(this.userPath, require("../main/user/user.routers"));
    this.app.use(this.activityPath, require("../main/activity/activity.routers"));
    this.app.use(this.categoryPath, require("../main/category/category.routers"));
    this.app.use(this.childrenPath, require("../main/children/children.routers"));
    this.app.use(this.classroomPath, require("../main/classroom/classroom.routers"));
    this.app.use(this.dashboardPath, require("../main/dashboard/dashboard.routers"));
    this.app.use(this.daybookPath, require("../main/daybook/daybook.routers"));
    this.app.use(this.daybookteacherPath, require("../main/daybookteacher/daybookteacher.routers"));
    this.app.use(this.menuPath, require("../main/menu/menu.routers"));
    this.app.use(this.rolePath, require("../main/role/role.routers"));
    this.app.use(this.institutionPath, require("../main/institution/institution.routers"));
    this.app.use(this.pictogramPath, require("../main/pictogram/pictogram.routers"));
    this.app.use(this.synonymPath, require("../main/synonym/synonym.routers"));
    this.app.use(this.storagePath, require("../main/storage/storage.routers"));
    this.app.use(this.teacherPath, require("../main/teacher/teacher.routers"));
    this.app.use(this.tutorPath, require("../main/tutor/tutor.routers"));
    
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`SERVER IS RUNING FOR PORT  http://127.0.0.1:${this.port}`);
    });
  }
}

module.exports = Server;
