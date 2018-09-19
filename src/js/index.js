import '../scss/index.scss'

/**
 * @namespace Namespace
 */

console.log(process.env.NODE_ENV);

function importAll(r) {
    return r.keys().map(r);
}  
const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));