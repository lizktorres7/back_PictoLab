const Activity = require("./activity.models")
const Category = require("./category.models")
const Children = require("./children.models")
const Classroom = require("./classroom.models")
const Dashboard = require("./dashboard.models")
const Daybook = require("./daybook.models")
const Daybookteacher = require("./daybookteacher.models")
const Menu = require("./menu.models")
const Pictogram = require("./pictogram.models")
const Role = require("./role.models")
const Synonym = require("./synonym.models")
const User = require("./user.models")
const Teacher = require("./teacher.models")
const Tutor = require("./tutor.models")
const Institution = require("./institution.models")
const Storage = require("./storage.models")

//const DaybookteacherActivity = require("./daybookteacher_activity")
const DaybookActivity = require("./daybook_activity")
const ActivityChildren = require("./activity_children")
const PictogramCategory = require("./pictogram_category")
const InstitutionRole = require("./institution_role.models")
const DashboardCategory = require("./dashboard_category")
const PictogramSynonym = require("./pictogram_synonym")
const DashboardPictogram = require("./dashboard_pictogram")
const MenuPictogram = require("./menu_pictogram")



/******************************* ONE TO ONE  *******************************/
// Esto establece una relación de uno a uno de Usuario a Maestro
User.hasOne(Teacher);
Teacher.belongsTo(User);

// Esto establece una relación de uno a uno de Usuario a Tutor
User.hasOne(Tutor);
Tutor.belongsTo(User);

// Esto establece una relación de uno a uno de Storage a Pictograma
Storage.hasOne(Pictogram);
Pictogram.belongsTo(Storage);



/******************************* ONE TO MENY *******************************/
// Esto establece una relación de uno a muchos de Profesor a Actividad
User.hasMany(Institution);
Institution.belongsTo(User);

// Esto establece una relación de uno a muchos de Profesor a Actividad
Teacher.hasMany(Activity);
Activity.belongsTo(Teacher);

// Esto establece una relación de uno a muchos de Profesor a Aula
Teacher.hasMany(Classroom);
Classroom.belongsTo(Teacher);

// Esto establece una relación de uno a muchos de Usuario a Tablero
User.hasMany(Dashboard);
Dashboard.belongsTo(User);

// Esto establece una relación de uno a muchos de Rol a Usuario
Role.hasMany(User);
User.belongsTo(Role);

// Esto establece una relación de uno a muchos de Usuario a Categoria
User.hasMany(Category);
Category.belongsTo(User);

// Esto establece una relación de uno a muchos de Tutor a Niños
Tutor.hasMany(Children);
Children.belongsTo(Tutor);

// Esto establece una relación de uno a muchos de Usuario a Pictograma
User.hasMany(Pictogram);
Pictogram.belongsTo(User);

// Esto establece una relación de uno a muchos de Usuario a Sinonimos
User.hasMany(Synonym);
Synonym.belongsTo(User);

// Esto establece una relación de uno a muchos de Profesor a Agenda(niño)
Teacher.hasMany(Daybook);
Daybook.belongsTo(Teacher);

Teacher.hasMany(Daybookteacher);
Daybookteacher.belongsTo(Teacher);

// Esto establece una relación de uno a muchos de Aula a Niños
Classroom.hasMany(Children);
Children.belongsTo(Classroom);

Children.hasMany(Daybook);
Daybook.belongsTo(Children);

Pictogram.hasMany(Activity);
Activity.belongsTo(Pictogram);

User.hasMany(Menu);
Menu.belongsTo(User);



/******************************* MENY TO MENY *******************************/
//MENY TO MENY Institution-Role
Institution.belongsToMany(Role, { through: InstitutionRole });
Role.belongsToMany(Institution, { through: InstitutionRole });
// End Institution-Role Relation

//MENY TO MENY Classromm-Children
/* Classroom.belongsToMany(Children, { through: ClassroomChildren });
Children.belongsToMany(Classroom, { through: ClassroomChildren }); */
// End Classromm-Children Relation

//MENY TO MENY Dashboard-Category
Dashboard.belongsToMany(Category, { through: DashboardCategory });
Category.belongsToMany(Dashboard, { through: DashboardCategory });
// End Dashboard-Category Relation

//MENY TO MENY Dashboard-Pictogram
Dashboard.belongsToMany(Pictogram, { through: DashboardPictogram });
Pictogram.belongsToMany(Dashboard, { through: DashboardPictogram });
// End Dashboard-Category Relation

//MENY TO MENY Daybook-Activity
Daybook.belongsToMany(Activity, { through: DaybookActivity });
Activity.belongsToMany(Daybook, { through: DaybookActivity });
// End Daybook-Activity Relation

//MENY TO MENY Daybookteacher-Children
/* Daybookteacher.belongsToMany(Activity, { through: DaybookteacherActivity });
Activity.belongsToMany(Daybookteacher, { through: DaybookteacherActivity }); */
// End Daybookteacher-Children Relation

//MENY TO MENY Menu-Pictogram
Menu.belongsToMany(Pictogram, { through: MenuPictogram });
Pictogram.belongsToMany(Menu, { through: MenuPictogram });
// End Menu-Pictogram Relation

//MENY TO MENY Pictogram-Category
Pictogram.belongsToMany(Category, { through: PictogramCategory });
Category.belongsToMany(Pictogram, { through: PictogramCategory });
// End Pictogram-Category Relation

//MENY TO MENY Pictogram-Synonym
Pictogram.belongsToMany(Synonym, { through: PictogramSynonym });
Synonym.belongsToMany(Pictogram, { through: PictogramSynonym });
// End MENY TO MENY Pictogram-Synonym





module.exports = {
  Activity,
  Category,
  Children,
  Classroom,
  Dashboard,
  Daybook,
  Daybookteacher,
  Menu,
  Pictogram,
  Role,
  Synonym,
  User,
  Teacher,
  Tutor,
  Institution,
  Storage,
  ActivityChildren,
  PictogramCategory,
  InstitutionRole,
  DaybookActivity,
  //DaybookteacherActivity,
  DashboardPictogram,
  DashboardCategory,
  PictogramSynonym,
  MenuPictogram,
}