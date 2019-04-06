class SeaRocks  {
    /**
     * Create rocks in the sea water
     * @param {THREE.Scene} scene 
     */
    constructor(scene, px = 0, pz = 0) {
        var pivot = new THREE.Object3D()
      // sea rock1
      var rockgeo1 = new THREE.BoxGeometry(0.2,0.38,0.1);
      var rockmat1 = new THREE.MeshLambertMaterial( { color: 0x717a74 } );
      var rock1 = new THREE.Mesh( rockgeo1, rockmat1 );
      rock1.position.set(-2, 0.2, 2.5)
      rock1.castShadow = true;
      rock1.receiveShadow = true;
      pivot.add( rock1 );
      //sea rock2
      var rock2 = rock1.clone();
     rock2.position.set(-2.2, 0.2, 2.2); 
     rock2.castShadow = true;
     rock2.receiveShadow = true;
     pivot.add( rock2 );
     // sea rock3
     var rockgeo3 = new THREE.BoxGeometry(0.3,0.15,0.3);
     var rockmat3 = new THREE.MeshLambertMaterial( { color: 0x717a74 } );
     var rock3 = new THREE.Mesh( rockgeo3, rockmat3 );
     rock3.position.set(-2, 0.1, 2.5)
     rock3.castShadow = true;
     rock3.receiveShadow = true;
     pivot.add( rock3 );
     // sea rock4
     var rockgeo4 = new THREE.BoxGeometry(0.1,0.1,0.1);
     var rockmat4 = new THREE.MeshLambertMaterial( { color: 0x404142 } );
     var rock4 = new THREE.Mesh( rockgeo4, rockmat4 );
     rock4.position.set(-1.8, 0.1, 2.3)
     rock4.castShadow = true;
     rock4.receiveShadow = true;
     pivot.add( rock4 );
     //sea rock5
     var rock5 = rock4.clone();
     rock5.position.set(-1.7, 0.1, 2.4); 
     rock5.castShadow = true;
     rock5.receiveShadow = true;
     pivot.add( rock5 );
     //sea rock6
     var rock6 = rock4.clone();
     rock6.position.set(-2, 0.1, 2.2); 
     rock6.castShadow = true;
     rock6.receiveShadow = true;
     pivot.add( rock6 );
     //sea rock7
     var rock7 = rock4.clone();
     rock7.position.set(-2, 0.1, 2.3); 
     rock7.castShadow = true;
     rock7.receiveShadow = true;
     pivot.add( rock7 );
     // sea rock8
     var rockgeo8 = new THREE.BoxGeometry(0.3,0.25,0.2);
     var rockmat8 = new THREE.MeshLambertMaterial( { color: 0x717a79 } );
     var rock8 = new THREE.Mesh( rockgeo8, rockmat8 );
     rock8.position.set(-2.2, 0.1, 2.3)
     rock8.castShadow = true;
     rock8.receiveShadow = true;
     pivot.add( rock8 );
     //sea rock9
     var rock9 = rock8.clone();
     rock9.position.set(-2.1, 0.1, 2.6); 
     rock9.castShadow = true;
     rock9.receiveShadow = true;
     pivot.add( rock9 );
    //sea rock10
    var rock10 = rock1.clone();
    rock10.position.set(-2.1, 0.15, 2.4); 
    rock10.castShadow = true;
    rock10.receiveShadow = true;
    pivot.add( rock10 ); 
    
    pivot.position.set(px, 0, pz)
    scene.add(pivot)


    }
}
