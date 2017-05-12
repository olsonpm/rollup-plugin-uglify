import { minify } from 'uglify-js';

function uglify(options, minifier) {
	if ( options === void 0 ) options = {};
	if ( minifier === void 0 ) minifier = minify;

	return {
		name: 'uglify',

		transformBundle: function transformBundle(code) {
			// trigger sourcemap generation
			if (options.sourceMap !== false) {
				options.sourceMap = true;
			}

			var result = minifier(code, options);

			// Strip sourcemaps comment and extra \n
			if (result.map) {
				var commentPos = result.code.lastIndexOf('//#');
				result.code = result.code.slice(0, commentPos).trim();
			}

			return result;
		}
	};
}

export default uglify;
