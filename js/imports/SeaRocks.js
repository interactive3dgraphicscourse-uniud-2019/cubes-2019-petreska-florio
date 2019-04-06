class SeaRocks  {
    /**
     * Create rocks in the sea water
     * @param {THREE.Scene} scene 
     */
    constructor(scene) {
        var pivot = new THREE.Object3D()
        
        //beach ground same as sea cube
        var rockgeo1 = new THREE.BoxGeometry(0.5,0.5,0.5);
        var rockmat1 = new THREE.MeshLambertMaterial( { color: 0x65341f } );
        var rock1 = new THREE.Mesh( rockgeo1, rockmat1 );
        rock1.position.set(1, 1, 1)

        rock1.castShadow = true;
        rock1.receiveShadow = true;
       
        pivot.add( rock1 );

        
        /*
         //duplicating the small ground parts on ground n.1
        var smallPartGround2 = smallPartGround1.clone();
		smallPartGround2.position.set(0.04, 0.05, -1.55); 
        pivot.add( smallPartGround2 );
        smallPartGround2.receiveShadow = true;
        */

        

        scene.add(pivot)
    }
}
