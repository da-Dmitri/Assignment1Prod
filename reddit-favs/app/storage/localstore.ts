type Favs = string[];
const FavsKey = "favoriteposts";

function setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}
function getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
}

export function getFavs(): Favs {
    let result = getItem<Favs>(FavsKey);
    if(result === null) {
        return([]);
    } else {
        return result;
    }
}
function setFavs(replace: Favs) {
    setItem<Favs>(FavsKey,replace);
}

// add a post id if it doesn't already exist
//
export function AddFavorite(id: string) {
    let old = getFavs()
    if(old === null || old.length < 1) {
        setFavs([id]);
    } else if(!(old.includes(id))) {
        old.push(id);
        setFavs(old);
    }
}

// remove a post id if it exists
//
export function RemoveFavorite(id: string) {
    let old = getFavs()
    if(old === null || old.length < 1) {
        return;
    } else if((old.includes(id))) {
        let pos = old.indexOf(id);
        old.splice(pos, 1);
        setFavs(old);
    }
}

// check whether to display the heart on a post
//
export function IsFavorited(id: string): boolean {
    let old = getFavs()
    if(old === null || old.length < 1) {
        return false;
    } else {
        return old.includes(id);
    }
}
  