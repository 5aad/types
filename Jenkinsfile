@Library('pipeline') _

def version = '21.1000'

node ('controls') {
    checkout_pipeline("20.7000/schemeeditor")
    run_branch = load '/home/sbis/jenkins_pipeline/platforma/branch/run_branch'
    run_branch.execute('types', version)
}