
var playerScreens = [];
var playerBanners = [];
var playerBannerObjects = [];
var playerMulligan = [];
var playerPeek = [];


var lights = [];

var flagpoles = [];

var deckLists = [];



function setupUserElements() {
	//User screens
	var ingameMask = THREE.ImageUtils.loadTexture( 'img/ingame_mask.png' );
	var mulliganMask = THREE.ImageUtils.loadTexture( 'img/mulligan_mask.png' );
	var mulliganPlate = THREE.ImageUtils.loadTexture( 'img/mulligan_plate.png' );
	var mulliganBump = THREE.ImageUtils.loadTexture( 'img/mulligan_bump.png' );
	var peekMask = THREE.ImageUtils.loadTexture( 'img/peek_mask.png' );
	var peekFrame = THREE.ImageUtils.loadTexture( 'img/peek_frame.png' );
	videoMaterials[1].alphaMap = ingameMask;
	videoMaterials[2].alphaMap = ingameMask;
	mulliganMaterials[1].alphaMap = mulliganMask;
	mulliganMaterials[2].alphaMap = mulliganMask;
	peekMaterials[1].alphaMap = peekMask;
	peekMaterials[2].alphaMap = peekMask;

	var mulliganFrame = new THREE.MeshPhongMaterial( { map: mulliganPlate, bumpMap: mulliganBump , side: THREE.DoubleSide, transparent: true });
	var peekFrameMaterial = new THREE.MeshBasicMaterial( { map: peekFrame, side: THREE.DoubleSide, transparent: true, depthWrite: false});



	var screenGeometry = new THREE.PlaneGeometry(1280, 720);

	playerScreens[0] = new THREE.Mesh( screenGeometry, videoMaterials[1] );
	scene.add(playerScreens[0]);

	playerScreens[1] = new THREE.Mesh( screenGeometry, videoMaterials[2] );
	scene.add(playerScreens[1]);

	playerPeek[0] = THREE.SceneUtils.createMultiMaterialObject( screenGeometry, [peekMaterials[1],peekFrameMaterial] );
	scene.add(playerPeek[0]);

	playerPeek[1] = THREE.SceneUtils.createMultiMaterialObject( screenGeometry, [peekMaterials[2], peekFrameMaterial] );
	scene.add(playerPeek[1]);

	playerPeek[0].position.set(640, 1020, -100);
	playerPeek[1].position.set(640, 1020, -100);

	playerMulligan[0] = THREE.SceneUtils.createMultiMaterialObject( screenGeometry, [mulliganMaterials[1], mulliganFrame] );
	scene.add(playerMulligan[0]);

	playerMulligan[1] = THREE.SceneUtils.createMultiMaterialObject( screenGeometry, [mulliganMaterials[2], mulliganFrame] );
	scene.add(playerMulligan[1]);


	// Banners


	playerBanners[0] = new Cloth(xSegs, ySegs);
	playerBanners[1] = new Cloth(xSegs, ySegs);
	playerBanners[2] = new Cloth(xSegs, ySegs);
	playerBanners[3] = new Cloth(xSegs, ySegs);

	var bannerTexture = THREE.ImageUtils.loadTexture( 'img/banner_hole.png' );
	var bannerTextureMask = THREE.ImageUtils.loadTexture( 'img/banner_hole_mask.png' );
	var bannerTextureBump = THREE.ImageUtils.loadTexture( 'img/banner_bump.png' );
	var viagameTexture = THREE.ImageUtils.loadTexture( 'img/banner_spons.png' );
	var viagameTextureBump = THREE.ImageUtils.loadTexture( 'img/banner_spons_bump.png' );


	//bumpMap: bannerTextureBump,
	var bannerMaterial = new THREE.MeshPhongMaterial( { ambient: 0xffffff, color: 0xffffff, specular: 0x030303, emissive: 0x111111, shiness: 10, bumpScale:1, map: bannerTexture, bumpMap: bannerTextureBump, side: THREE.DoubleSide, transparent: true} );
	var viagameMaterial = new THREE.MeshPhongMaterial( { ambient: 0xffffff, color: 0xffffff, specular: 0x030303, emissive: 0x111111, shiness: 10, bumpScale:1, map: viagameTexture, bumpMap: viagameTextureBump, side: THREE.DoubleSide, transparent: true} );

	videoMaterials[3].alphaMap = bannerTextureMask;
	videoMaterials[4].alphaMap = bannerTextureMask;


	var clothGeometry1 = new THREE.ParametricGeometry( clothFunction, playerBanners[0].w, playerBanners[0].h );
	var clothGeometry2 = new THREE.ParametricGeometry( clothFunction, playerBanners[1].w, playerBanners[1].h );
	var clothGeometry3 = new THREE.ParametricGeometry( clothFunction, playerBanners[2].w, playerBanners[2].h );
	var clothGeometry4 = new THREE.ParametricGeometry( clothFunction, playerBanners[3].w, playerBanners[3].h );

	playerBanners[0].geometry = clothGeometry1;
	playerBanners[1].geometry = clothGeometry2;
	playerBanners[2].geometry = clothGeometry3;
	playerBanners[3].geometry = clothGeometry4;

	// playerBanners[0].drop();
	// playerBanners[1].drop();
	// playerBanners[2].drop();
	// playerBanners[3].drop();

	playerBannerObjects[0] = THREE.SceneUtils.createMultiMaterialObject( clothGeometry1, [bannerMaterial, bannerTexts[0].material, videoMaterials[3]]);
	playerBannerObjects[1] = THREE.SceneUtils.createMultiMaterialObject( clothGeometry2, [bannerMaterial, bannerTexts[1].material, videoMaterials[4]] );
	playerBannerObjects[2] = THREE.SceneUtils.createMultiMaterialObject( clothGeometry3, [viagameMaterial] );
	playerBannerObjects[3] = THREE.SceneUtils.createMultiMaterialObject( clothGeometry4, [viagameMaterial] );

	playerBannerObjects[0].position.set( 120, -225, 0 );
	playerBannerObjects[1].position.set( -120, -225, 0 );
	playerBannerObjects[2].position.set( -120, -225, 0 );
	playerBannerObjects[3].position.set( +120, -225, 0 );




	playerBannerObjects[0].scale.set( 0.8, 0.8, 0.8 );
	playerBannerObjects[1].scale.set( 0.8, 0.8, 0.8 );
	playerBannerObjects[2].scale.set( 0.8, 0.8, 0.8 );
	playerBannerObjects[3].scale.set( 0.8, 0.8, 0.8 );


	setTextureScale(videoTextures[3], {scale:{x:0.450, y: 1.95}, offset:{x:0.27, y: -0.83	}});

	setTextureScale(videoTextures[4], {scale:{x:0.450, y: 1.95}, offset:{x:0.27, y: -0.83	}});





	var pole = new THREE.Object3D();
	var brassTexture = THREE.ImageUtils.loadTexture( 'img/wood1.jpg' );
	var brassTextureBump = THREE.ImageUtils.loadTexture( 'img/wood1_bump.jpg' );

		brassTexture.wrapS = THREE.RepeatWrapping;
		brassTexture.wrapT = THREE.RepeatWrapping;
		brassTexture.repeat.set( 1, 10 );


		brassTextureBump.wrapS = THREE.RepeatWrapping;
		brassTextureBump.wrapT = THREE.RepeatWrapping;
		brassTextureBump.repeat.set( 1, 3 );

	var brassMaterial = new THREE.MeshPhongMaterial( { map:brassTexture, bumpMap: brassTextureBump, bumpScale:4, ambient: 0xffffff, color: 0xffffff, shininess: 0} );

	var cylinder = new THREE.Mesh( new THREE.CylinderGeometry( 5, 5, 450, 32 ), brassMaterial);
	var knob = new THREE.Mesh(new THREE.SphereGeometry( 10, 32, 32 ), brassMaterial);
	knob.position.x = 230;
	var knob2 = knob.clone();
	knob2.position.x = -230;

	pole.add(cylinder);
	pole.add(knob);
	pole.add(knob2);

	cylinder.rotation.set(Math.PI,0,Math.PI/2);


	var cylinder = new THREE.Mesh( new THREE.CylinderGeometry( 5, 5, 900, 32 ), brassMaterial);
	cylinder.position.y = -450;


	pole.add(cylinder);




	var pole2 = pole.clone();

	pole.add(playerBannerObjects[0]);
	pole2.add(playerBannerObjects[1]);
	pole.add(playerBannerObjects[2]);
	pole2.add(playerBannerObjects[3]);

	scene.add(pole);
	scene.add(pole2);



	pole.position.set(640, 500, 0);
	pole.rotation.set(0, 0.9, 0);

	pole2.position.set(1280-105, 690, 0);
	pole2.rotation.set(0, -0.9, 0);

	flagpoles[0] = pole;
	flagpoles[1] = pole2;




	lights[0] = new THREE.SpotLight( 0xFFFFff, 2, 3000, 0.3 );
	lights[0].exponent = 50;
	lights[0].position.set(640, 720, 1000);
	lights[0].target = playerBannerObjects[0];
	scene.add( lights[0] );

	lights[1] = new THREE.SpotLight( 0xFFFFff, 2, 3000, 0.3 );
	lights[1].exponent = 50;
	lights[1].position.set(640, 720, 1000);
	lights[1].target = playerBannerObjects[1];
	scene.add( lights[1] );

	lights[2] = new THREE.SpotLight( 0xFFFFff, 2, 3000, 0.3 );
	lights[2].exponent = 50;
	lights[2].position.set(640, 720, 1000);
	lights[2].target = playerBannerObjects[2];
	scene.add( lights[2] );

	lights[3] = new THREE.SpotLight( 0xFFFFff, 2, 3000, 0.3 );
	lights[3].exponent = 50;
	lights[3].position.set(640, 720, 1000);
	lights[3].target = playerBannerObjects[3];
	scene.add( lights[3] );

	lights[4] = new THREE.PointLight( 0xFFFFff, 0.8);
	lights[4].position.set(640, 360, -400);
	scene.add( lights[4] );

	lights[5] = new THREE.PointLight( 0xFFFFff, 0.6);
	lights[5].position.set(640, 300, 800);
	scene.add( lights[5] );


	deckLists[1] = new cardList(document.getElementById('decklist1'));
	deckLists[2] = new cardList(document.getElementById('decklist2'));

}
