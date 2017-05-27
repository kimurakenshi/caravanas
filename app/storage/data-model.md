# Data Model

I high level representation of the data model that will be consumed for the application.

## Company

```javascript
{
    id,
    name,
    description,
}
```

## Companies (array of companies)

```javascript
[
    {
		id,
		name
	},
	...
]
```

## Caravana

```javascript
{
    id,
    number,
}
```

## Caravanas (array of caravanas)

A caravana entity can belong to one and only one company entity.

```javascript
[
    {
		id,
		idCompany,
		number,
	},
	...
]
```
## Movements

Group a certain number of caravanas of an specific company.

```javascript
{
    id,
    date,
    status,
    idCompany,
    caravanas: [
     id, 
     number,  
    ]
}
```

`status` could have the following values:

`IN_PROGRESS`: the movement has being created but not confirmed.
`CONFIRMED`: the movement has being confirmed.

> When a movement is confirmed all the caravanas associated to that movement will be deleted
from the list of caravanas that belong to the current company.

## Settings

This model have to be loaded when the application starts to read the settings for the current
user. Everything else will be fetched while needed.

```javascript
	{
		data: {
		    activeCompanyId, // represents the company that will be set by default if apply.
		},
		app: {
		    sidebarOpen,
		}
	}
```
