# BST-Trackers

[![wakatime](https://wakatime.com/badge/github/MrBisquit/BST-Trackers.svg)](https://wakatime.com/badge/github/MrBisquit/BST-Trackers)

- Open source tracker
- Free to use (MIT License)
- Take what you want
- Contribute if you feel like it

BST-Tracker is an open-source modular tracker that allows you to track users on your website by seeing actions they take on your website. You can easily customise it and edit everything, allows you to see currently active tracking sessions including currently online users, allows you to click on a tracking session to see every single action they have taken and also terminate the tracking session to start over. Settings are included, all be-it a little buggy.

## Documentation

### Features

- Built in trackers.js file.
- Comes ready-to-use.
- Full dashboard
- Customisable


### Deployment

To deploy this project follow these steps

- Download repositiory
- Add `tracking_ids.json` file with the content of `{}`
- Run this: 
```bash
  node .
```
- Now visit `localhost` (`localhost:80`) to see it!

`/dashboard/` is the dashboard link.


### API Reference

#### **GET** | Get all sessions

```http
  GET /data
```

Returns all sessions in an object form.

#### **GET** | Get specific session

```http
  GET /data/s/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of session to fetch |

#### **POST** | Send tracking data

```http
  POST /tracking_data
```
Send JSON tracking data from tracking.js via body of POST request.

#### **GET** | Get config

```http
  GET /config
```

Gets the config.

#### **POST** | Set config

```http
  POST /config
```

Sets the config.
Send JSON config data via body of POST request.


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Used By

This project is used by the following websites/companies/people:

#### For obfuscating use https://www.obfuscator.io/ on high options preset
#### For mininfying use https://minify-js.com/