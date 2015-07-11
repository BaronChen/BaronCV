/// <vs BeforeBuild='bower:dev' />
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		bower: {
			install: {
			}
		},
		bowercopy: {
			options: {
				runBower: true,
				srcPrefix: 'bower_components'
			},
			js: {
				options: {
					destPrefix: 'js'
				},
				files: {
					'angular': 'angular',
					'angular-route': 'angular-route',
					'angular-animate': 'angular-animate',
					'angular-bootstrap': 'angular-bootstrap',
					'angular-cookies': 'angular-cookies',
					'angular-resource': 'angular-resource',
					'jquery': 'jquery/dist',
					'angular-loading-bar/loading-bar.min.js': 'angular-loading-bar/build/loading-bar.min.js',
					'angular-loading-bar/loading-bar.js': 'angular-loading-bar/build/loading-bar.js',
					'angular-local-storage/angular-local-storage.js': 'angular-local-storage/dist/angular-local-storage.js',
					'angular-local-storage/angular-local-storage.min.js': 'angular-local-storage/dist/angular-local-storage.min.js',
					'angular-filter/angular-filter.js': 'angular-filter/dist/angular-filter.js',
					'angular-filter/angular-filter.min.js': 'angular-filter/dist/angular-filter.min.js',
					'ngSmoothScroll/angular-smooth-scroll.js': 'ngSmoothScroll/angular-smooth-scroll.js',
					'angular-scroll-watch/angular-scroll-watch.js': 'angular-scroll-watch/build/angular-scroll-watch.js',
					'angular-scroll-watch/angular-scroll-watch.min.js': 'angular-scroll-watch/build/angular-scroll-watch.min.js',
					'angular-ui-router/angular-ui-router.js': 'angular-ui-router/release/angular-ui-router.js',
					'angular-ui-router/angular-ui-router.min.js': 'angular-ui-router/release/angular-ui-router.min.js',
					'Chart.js/Chart.js': 'Chart.js/Chart.js',
					'Chart.js/Chart.min.js': 'Chart.js/Chart.min.js',
					'angualar-chart.js/angular-chart.js': 'angular-chart.js/dist/angular-chart.js',
					'angualar-chart.js/angular-chart.min.js': 'angular-chart.js/dist/angular-chart.min.js',
					'angualar-chart.js/angular-chart.min.js.map': 'angular-chart.js/dist/angular-chart.min.js.map',
					'angular-touch/angular-touch.js': 'angular-touch/angular-touch.js',
					'angular-touch/angular-touch.min.js': 'angular-touch/angular-touch.min.js',
					'angular-touch/angular-touch.min.js.map': 'angular-touch/angular-touch.min.js.map'
				}
			},
			css: {
				options: {
					destPrefix: 'css'
				},
				files: {
					'bootstrap': 'bootstrap/dist',
					'angular-loading-bar/loading-bar.min.css': 'angular-loading-bar/build/loading-bar.min.css',
					'angular-loading-bar/loading-bar.css': 'angular-loading-bar/build/loading-bar.css',
					'animate.css/animate.css': 'animate.css/animate.css',
					'animate.css/animate.min.css': 'animate.css/animate.min.css',
					'font-awesome/.': 'font-awesome/css',
					'bootstrap-social/bootstrap-scocial.css': 'bootstrap-social/bootstrap-social.css',
					'angualar-chart.js/angular-chart.css': 'angular-chart.js/dist/angular-chart.css',
					'angualar-chart.js/angular-chart.css.map': 'angular-chart.js/dist/angular-chart.css.map'
				}
			},
			fonts: {
				options: {
					destPrefix: 'css/fonts'
				},
				files: {
					'.': 'font-awesome/fonts'
				}
			},
			fonts2: {
				options: {
					destPrefix: 'css/fonts'
				},
				files: {
					'.': 'bootstrap/dist/fonts'
				}
			}
		},

		ts: {
			TypeScriptComplie : {
				files: [{ src: ["app/*.ts"] }],
				options: {
					fast: 'never'
				}
			}
		},

		useminPrepare: {
			html: './index.html',
			options: {
				dest: '../../dist'
			}
		},
		usemin: {
			html: ['../../dist/index.html']
		},
		copy: {
			html: {
				files: [{ src: './index.html', dest: '../../dist/index.html' }
						]
			},
			js: {
				cwd: './js',  
				src: '**/*',           
				dest: '../../dist/js',    
				expand: true          	
			},
			css: {	
				cwd: './css',
				src: '**/*',          
				dest: '../../dist/css',    
				expand: true           				
			},
			views: {
				cwd: './app/view',
				src: '**/*',
				dest: '../../dist/app/view',
				expand: true
			},
			appcss: {
				cwd: './app/css',
				src: '**/*',
				dest: '../../dist/app/css',
				expand: true
			},
			data: {
				cwd: './app/data',
				src: '**/*',
				dest: '../../dist/app/data',
				expand: true
			},
			image: {
				cwd: './app/image',
				src: '**/*',
				dest: '../../dist/app/image',
				expand: true
			}
		}


	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-ts');
	// Default task(s).
	grunt.registerTask('default', [
		'copy:html',
		'copy:js',
		'copy:css',
		'copy:views',
		'copy:appcss',
		'copy:data',
		'copy:image',
		'useminPrepare',
		'concat',
		'uglify',
		'usemin'
	]);

};