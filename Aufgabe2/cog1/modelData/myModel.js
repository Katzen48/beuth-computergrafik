/**
 * 3D Data Store for a model.
 * Missing properties/arrays (commented out)
 * are mixed in from data module.
 *  
 * @namespace cog1.data
 * @module cube
 */
define(["exports", "data"], function(exports, data) {
	"use strict";

	/**
	 * Create an instance of the model defined in this module.
	 * 
	 * @parameter object with fields:
	 * @parameter scale is the edge length of the cube.
	 * @returns instance of this model.
	 */
	exports.create = function(parameter) {
		
		if(parameter) {
			var scale = parameter.scale;
			var textureURL = parameter.textureURL;
			// Each face shows a different area of the given texture (e.g, a dice).
			var sixFacesTexture = parameter.sixFacesTexture;
		}
		// Set default values if parameter is undefined.
		if(scale == undefined){
			scale = 200;
		}
		if(textureURL == undefined){
			textureURL = "";
		}
		if(sixFacesTexture == undefined){
			sixFacesTexture = false;
		}

		// Instance of the model to be returned.
		var instance = {};

		// Vertex indices:							
		//   7----6
		//	/|   /|
		// 4----5 |
		// | 3--|-2
		// |/   |/
		// 0----1
		instance.vertices = [
			// bottom (y=-1)
			[-1,-1, 1],
			[ 1,-1, 1],
			[ 1,-1,-1],
			[-1,-1,-1],
			// top (y=+1)		
			[-1,1, 1],
			[ 1,1, 1],
			[ 1,1,-1],
			[-1,1,-1],
            // roof
            [0,2,1],
            [0,2,-1],
            // garage
            [2,-1,1],
            [2,-1,-1],
            [2,0,1],
            [2,0,-1],
            [1,0,1],
            [1,0,-1],
            // garage roof
            [1.5,1,1],
            [1.5,1,-1],
            // door
            [-0.25,-1,1],
            [0.25,-1,1],
            [-0.25,0,1],
            [0.25,0,1],
            // garage door
            [1.25,-1,1],
            [1.75,-1,1],
            [1.25,-0.5,1],
            [1.75,-0.5,1],
            // door knob
            [-0.15,-0.5,1],
            [-0.1,-0.5,1],
            [-0.15,-0.45,1],
            [-0.1,-0.45,1],
            // chimney
            [0.5,1.5,0.25],      //30
            [0.75,1.25,0.25],    //31
            [0.75,1.25,-0.25],   //32
            [0.5,1.5,-0.25],     //33
            [0.5,1.75,0.25],     //34
            [0.75,1.75,0.25],    //35
            [0.75,1.75,-0.25],   //36
            [0.5,1.75,-0.25],    //37
		];
		// Use default colors, implicitly.
		// instance.colors = data.colors;

		// Corners of the faces have to fit the texture coordinates.			
		// Faces: bottom/down, top/up, front, right, back, left. 
		instance.polygonVertices = [
			[3,2,1,0],
			[4,5,6,7],
			[4,0,1,5],
			[1,2,6,5],
			[6,2,3,7],
			[3,0,4,7],
            // roof
            [9,8,5,6],
            [9,8,4,7],
            // garage
            [11,10,1,2],
            [13,12,10,11],
            [15,14,12,13],
            // garage roof
            [17,16,14,15],
            [17,16,12,13],
            // door
            [21,20,18,19],
            // garage door
            [25,24,22,23],
            // door knob
            [29,28,26,27],
            // chimney
            [35,34,37,36],
            [31,30,34,35],
            [32,31,35,36],
            [33,32,36,37],
            [33,30,34,37],
		];	

		instance.polygonColors = [0,1,2,3,4,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		
		//instance.vertexNormals = [];
		//instance.polygonNormals = [];

		if( ! sixFacesTexture){
	        // Use default texture coordinates.
			// instance.textureCoord = [];	
			// For order of corners of faces, see polygonVertices.
			instance.polygonTextureCoord = [
				[1,2,3,0],
				[1,2,3,0],
				[1,0,3,2],
				[3,0,1,2],
				[3,0,1,2],
				[3,0,1,2]
			];
		} else {
			// BEGIN exercise Cube-Dice-Texture
			
			// Order 0 to 16 form bottom-left to top-right
			// line by line, indices in spatial order:
			instance.textureCoord = [];
			// ...

			// Use textureCoord in order given for textureCoord.
			// The order of corners of faces must fit the one given in polygonVertices.
			// Match orientation of face given for polygonVertices.
			// D=bottom/down, U=top/up, F=front, R=right, B=back, L=left
			// The mapping is explained on the texture image.
			// instance.polygonTextureCoord = [ ....];

			// END exercise Cube-Dice-Texture			
		}
		
		instance.textureURL = textureURL;

		data.applyScale.call(instance, scale);

		return instance;		
	};
});