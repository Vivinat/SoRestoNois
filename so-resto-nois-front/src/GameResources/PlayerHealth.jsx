export default function PlayerHealth() {
    let currentHealth = 10;
    let totalHealth = 10;
    
    return(
        <>
        
        <div class="health-bar" totalHealth = {totalHealth} currentHealth = {currentHealth}>
            <div class="bar">
                <div class="hit"></div>
            </div>
        </div>      
        </>
        
    )
}