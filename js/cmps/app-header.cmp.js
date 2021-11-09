export default {
    template: `
        <header class="app-header">
        <div>   
            <h1><router-link to="/book">Books</router-link></h1>
        </div>   
        
        
            <nav>
            <router-link to="/" active-class="active-link" exact>Home</router-link> |
            <router-link to="/book">Books</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
        </header>
    `,
}