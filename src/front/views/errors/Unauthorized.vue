<template>
    <section class="app_full-section app_img-section app_padding-section">
        <img class="img-background" src="../../assets/images/fond_moto.jfif"/>
        <div class="content">
            <h1>Non autorisé</h1>
            <p>Vous ne pouvez pas accéder à cette ressource.</p>
            <RouterLink :to="'/'">
                <button class="cta">Retourner à l'accueil</button>
            </RouterLink>
        </div>
    </section>
</template>