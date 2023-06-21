module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        less: { //Configuração do LESS
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less' // 'Arquivo destino': 'Arquivo origem'
                }
            },
            production: { // Configurando o ambiente de produção (ambiente final)
                options: {
                    compress: true // Comprimir o arquivo
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less' // 'Arquivo destino': 'Arquivo origem'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: { //Ambiente de desenvolvimento
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: { //Ambiente de produção (Final)  // Segundo: Substituir na pasta final
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS', // O que vai ser substituido
                            replacement: './styles/main.min.css' //Valor a ser injetado no lugar de "ENDERECO_DO_CSS"
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'], // Arquivo origem
                        dest: 'dist/' // Pasta de destino: Pasta final
                    }
                ]
            }
        },
        htmlmin: { //Configurando o plugin que minifica o arquivo html
            dist: { //Ambiente de produção
                options: {
                    removeComments: true, //Remove qualquer comentário que tiver no HTML
                    collapseWhitespace: true //Todo espaço em branco vai ser apagado
                },
                files: { //Primeiro: minificar para uma pasta temporária, Segundo: substituir na pasta final
                    'prebuild/index.html': 'src/index.html' // 'Arquivo destino (Minificado)': 'Arquivo origem' // ~Primeiro minificar~
                }
            }
        },
        clean: ['prebuild'],
        uglify: { // Configurando o plugin de minificação do Js
            target: {
                files: { //Arquivo destino: Arquivo origem
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less'); //Plugin para compilar LESS 
    grunt.loadNpmTasks('grunt-contrib-watch'); //Plugin que observa as mudanças de determinado arquivo
    grunt.loadNpmTasks('grunt-replace'); //Plugin que substitui valores
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); //Plugin para minificar o html
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify'); //Plugin para minificar o JavaScript

    grunt.registerTask('default', ['watch']); //Adicionando funções para a função default
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']); // Comandos para a build
}