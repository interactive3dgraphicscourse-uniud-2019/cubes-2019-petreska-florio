
        /* Starting code */   
		var scene, camera, renderer, controls, stats, castaway, music, listener, cameraRotation, cameraRotate, initialZoomIn,  cameraZoomIn, zoomDirection, zoomSpeed, currentFrameTime, keyFrameTime, initialTime;
		
		function audioClick() {
			if(!music) {
				music = new THREE.Audio( listener );

				let audioLoader = new THREE.AudioLoader();
				audioLoader.load( 'sounds/bg-music-small.mp3', function( buffer ) {
					music.setBuffer( buffer )
					music.setLoop( true )
					music.setVolume( .4 )
					music.play()
				})
			} else {
				if(music.isPlaying) {
					music.pause()
				} else {
					music.play()
				}
			}
			changeIcon()
		}

		function changeIcon() {
			if(document.getElementById("sound-control").firstChild.classList.contains("fa-volume-up")) {
				document.getElementById("sound-control").innerHTML = "<i class='fa  fa-volume-mute'></i>"
			} else {
				document.getElementById("sound-control").innerHTML = "<i class='fa  fa-volume-up'></i>"
			}
			
		}

		function Start() {
			currentFrameTime = Date.now()
			keyFrameTime = currentFrameTime
			initialTime = currentFrameTime
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			renderer = new THREE.WebGLRenderer( {antialias: true} );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.setClearColor( 0xf0f0f0 );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.gammaInput = true;
			renderer.gammaOutput = true;
			renderer.shadowMap.enabled = true;
			document.body.appendChild( renderer.domElement );
			
			camera.position.set(0,1,25);
			camera.lookAt( new THREE.Vector3(0,0,0));

			cameraRotation = 0
			cameraRotate = false
			cameraZoomIn = false
			initialZoomIn = true
			zoomDirection = new THREE.Vector3(0,0,-1)
			zoomSpeed = -.05

			hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
			hemiLight.color.setHSL( 0.6, 1, 0.6 );
			hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
			hemiLight.position.set( 0, 500, 0 );
			scene.add( hemiLight );

			dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
			dirLight.color.setHSL( 0.1, 1, 0.95 );
			dirLight.position.set( -1, 1.75, 1 );
			dirLight.position.multiplyScalar( 50 );
			scene.add( dirLight );
			dirLight.castShadow = true;
			dirLight.shadow.mapSize.width = 128;
			dirLight.shadow.mapSize.height = 128;

			/*
			// GROUND
			var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
			var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
			groundMat.color.setHSL( 0.095, 1, 0.75 );
			var ground = new THREE.Mesh( groundGeo, groundMat );
			//ground.position.y = -0.5;
			ground.rotation.x = -Math.PI/2;
			scene.add( ground );
			ground.receiveShadow = true;
			*/
			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = '0px';
			document.body.appendChild( stats.domElement );
			
			// uncomment if you need to draw coordinate axes when building the scene
			//Coordinates.drawAllAxes();
			
			//controls = new THREE.OrbitControls( camera );
			//controls.addEventListener( 'change', Render );

			/* Project code */
			
			/* background music */
			listener = new THREE.AudioListener();
			camera.add( listener );

			var island = new Island()
			scene.add(island)

			var palmtree = new PalmTree()
			scene.add(palmtree)

			var searock = new SeaRocks()
			scene.add(searock)
			
			var searock2 = searock.clone()
			searock.position.set(5, 0, 0)
			scene.add(searock2)

			var searock3 = searock.clone()
			searock3.position.z = -5
			scene.add(searock3)

			var searock4 = searock.clone()
			searock4.position.set(-3, 0, -3)
			scene.add(searock4)

			castaway = new Castaway(scene, listener, music)
			
			
		}
		
		function Update() {
			
			currentFrameTime = Date.now()

			requestAnimationFrame( Update );
			//controls.update();  
			stats.update();
			castaway.update() //project code
			
			if(camera.position.z < 6) {
				if(initialZoomIn) {
					initialZoomIn = false
					keyFrameTime = currentFrameTime
				}
				if(currentFrameTime - keyFrameTime > 3000 && currentFrameTime - initialTime < 11000) {
					cameraRotate = true
				}
				
			}

			if(cameraRotation > 119*Math.PI/180 && cameraRotation < 121*Math.PI/180) {
				if(cameraRotate) {
					cameraRotate = false
					initialZoomIn = false
					keyFrameTime = currentFrameTime
				}
				if(currentFrameTime - keyFrameTime > 2500) {
					cameraZoomIn = true
					zoomSpeed = -.02
				}
			}

			if(cameraZoomIn && currentFrameTime - keyFrameTime > 5000) {
				cameraZoomIn = false
			}

			if(cameraRotate) {
				cameraRotation += .004	
				camera.position.x = Math.sin(cameraRotation)*6
				camera.position.z = Math.cos(cameraRotation)*6
				camera.lookAt(new THREE.Vector3(0,0,0))
			}

			if(initialZoomIn) {
				camera.position.z += zoomSpeed
				camera.lookAt(new THREE.Vector3(0,0,0))
			}

			if(cameraZoomIn) {
				console.log("here")
				camera.translateZ(zoomSpeed)
			}

			
			
			Render();
		}
		
		function Render() {
			
			renderer.render(scene, camera);
		}
		
		Start();
		Update();
			