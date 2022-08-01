const PI = 3.14159265358979323846264338;

function Rig(rig) {
  this.pos_x = 0;
  this.pos_y = -1;
  this.pos_z = -1.2;
  this.rot_x = 0;
  this.rot_y = 0;
  this.rot_z = 0;
  
  this.object3D = rig.object3D;
  
  this.vect_x = 0;
  this.vect_y = 1;
  
  this.forward = (amount) => {
    this.object3D.position.x = this.pos_x += this.vect_x *amount;
    this.object3D.position.z = this.pos_z -= this.vect_y *amount;
  };
  this.walkforwardleft = (amount) => {
    this.object3D.position.x = this.pos_x += this.vect_x *amount;
    this.object3D.position.x = this.pos_x -= this.vect_y *amount;
    this.object3D.position.z = this.pos_z -= this.vect_x *amount;
    this.object3D.position.z = this.pos_z -= this.vect_y *amount;
  };
  this.walkforwardright = (amount) => {
    this.object3D.position.x = this.pos_x += this.vect_x *amount;
    this.object3D.position.x = this.pos_x += this.vect_y *amount;
    this.object3D.position.z = this.pos_z += this.vect_x *amount;
    this.object3D.position.z = this.pos_z -= this.vect_y *amount;
  };
  this.backward = (amount) => {
    this.object3D.position.x = this.pos_x -= this.vect_x *amount;
    this.object3D.position.z = this.pos_z += this.vect_y *amount;
  };
  this.walkbackwardleft = (amount) => {
    this.object3D.position.x = this.pos_x -= this.vect_x *amount;
    this.object3D.position.x = this.pos_x -= this.vect_y *amount;
    this.object3D.position.z = this.pos_z -= this.vect_x *amount;
    this.object3D.position.z = this.pos_z += this.vect_y *amount;
  };
  this.walkbackwardright = (amount) => {
    this.object3D.position.x = this.pos_x -= this.vect_x *amount;
    this.object3D.position.x = this.pos_x += this.vect_y *amount;
    this.object3D.position.z = this.pos_z += this.vect_x *amount;
    this.object3D.position.z = this.pos_z += this.vect_y *amount;
  };
  this.walkleft = (amount) => {
    this.object3D.position.x = this.pos_x -= this.vect_y *amount;
    this.object3D.position.z = this.pos_z -= this.vect_x *amount;
  };
  this.walkright = (amount) => {
    this.object3D.position.x = this.pos_x += this.vect_y *amount;
    this.object3D.position.z = this.pos_z += this.vect_x *amount;
  };
  this.turnleft = (amount) => {
    this.object3D.rotation.y = this.rot_y += amount;
    this.updateVector();
  };
  this.turnright = (amount) => {
    this.object3D.rotation.y = this.rot_y -= amount;
    this.updateVector();
  };
  this.updateVector = () => {
    this.vect_x = -Math.sin(this.rot_y);
    this.vect_y = Math.cos(this.rot_y);
  };
}