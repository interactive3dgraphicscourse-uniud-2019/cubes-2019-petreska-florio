class PalmTree  {
    /**
     * Create an island made of sand in the middle of a sea
     * @param {THREE.Scene} scene 
     */
    constructor(scene) {
        //palm tree box 0
		var geometry4 = new THREE.BoxGeometry(0.2,0.2,0.2);
		var material4 = new THREE.MeshLambertMaterial( { color: 0x65341f } );
		var cube4 = new THREE.Mesh( geometry4, material4 );
		var pivot = new THREE.Object3D() // the parent node of all palm cubes 
		cube4.position.set(-0.5, 0.45,0) // base cube - will be cloned to obtain other cubes of the Palm Tree

		cube4.castShadow = true;
		cube4.receiveShadow = true;
		
		pivot.add( cube4 );
		//palm tree box 1
		var palmCube1 = cube4.clone();
		palmCube1.position.set(-0.42, 0.6, 0); 
		pivot.add( palmCube1 ); 
		//palm tree box 2
		var palmCube2 = cube4.clone();
		palmCube2.position.set(-0.3, 0.8, 0); 
		pivot.add( palmCube2 );
		//palm tree box 3
		var palmCube3 = cube4.clone();
		palmCube3.position.set(-0.3, 1, 0); 
		pivot.add( palmCube3 );
		//palm tree box 4
		var palmCube4 = cube4.clone();
		palmCube4.position.set(-0.2, 1.2, 0); 
		pivot.add( palmCube4 );
		//palm tree box 5
		var palmCube5 = cube4.clone();
		palmCube5.position.set(-0.1, 1.4, 0); 
		pivot.add( palmCube5 );

		//palm big leaf (bl)
		var bl_geo = new THREE.BoxGeometry(0.7,0.2,0.6);
		var bl_mat = new THREE.MeshLambertMaterial( { color: 0x2faf18 } );
		var bigLeaf = new THREE.Mesh( bl_geo, bl_mat );
		bigLeaf.position.set(0, 1.6, 0)

		bigLeaf.castShadow = true;
		bigLeaf.receiveShadow = true;
		
		pivot.add( bigLeaf );

		//palm medium leaf (ml)
		var ml_geo = new THREE.BoxGeometry(0.4,0.2,0.4);
		var ml_mat = new THREE.MeshLambertMaterial( { color: 0x2faf18 } );
		var mediumLeaf = new THREE.Mesh( ml_geo, ml_mat );
		mediumLeaf.position.set(0, 1.7, 0)

		mediumLeaf.castShadow = true;
		mediumLeaf.receiveShadow = true;
		
		pivot.add( mediumLeaf ); 

		//palm leaf cube 
		var geo = new THREE.BoxGeometry(0.2,0.2,0.2);
		var mat = new THREE.MeshLambertMaterial( { color: 0x2faf18 } ); //09f711
		var leafCube = new THREE.Mesh( geo, mat );
		leafCube.position.set(0.4, 1.5, 0)

		leafCube.castShadow = true;
		leafCube.receiveShadow = true;
		
		pivot.add( leafCube );

		//palm leaf cube 1
		var leafCube1 = leafCube.clone();
		leafCube1.position.set(0.55, 1.45, 0); 
		pivot.add( leafCube1 );
		//palm leaf cube 2
		var leafCube2 = leafCube.clone();
		leafCube2.position.set(-0.6, 1.5, 0); 
		pivot.add( leafCube2 );
		//palm leaf cube 3
		var leafCube3 = leafCube.clone();
		leafCube3.position.set(-0.4, 1.55, 0); 
		pivot.add( leafCube3 );
		//palm leaf cube 4
		var leafCube4 = leafCube.clone();
		leafCube4.position.set(0.1, 1.55, -0.4); 
		pivot.add( leafCube4 );
		//palm leaf cube 5
		var leafCube5 = leafCube.clone();
		leafCube5.position.set(0.1, 1.5, -0.55); 
		pivot.add( leafCube5 );
		//palm leaf cube 6 (top)
		var leafCube6 = leafCube.clone();
		leafCube6.position.set(0, 1.8, 0); 
		pivot.add( leafCube6 );
		//palm leaf cube 7
		var leafCube7 = leafCube.clone();
		leafCube7.position.set(0, 1.53, 0.55); 
		pivot.add( leafCube7 );
		//palm leaf cube 8
		var leafCube8 = leafCube.clone();
		leafCube8.position.set(0, 1.58, 0.35); 
		pivot.add( leafCube8 );
		//palm leaf cube 9
		var leafCube9 = leafCube.clone();
		leafCube9.position.set(0.65, 1.35, 0); 
		pivot.add( leafCube9 );
		//palm leaf cube 10
		var leafCube10 = leafCube.clone();
		leafCube10.position.set(0, 1.45, 0.65); 
		pivot.add( leafCube10 );
		

		scene.add(pivot)
			
		
    }
}