# 🗄️ Project Structure

Most of the code lives in the `app` folder and looks like this:

```sh
app
|
+-- components        # shared components used across the entire application
|
+-- context          # all the global variable that are pass to the entire app through createContext()
|
+-- provider          #
|
+-- lib               # re-exporting different libraries preconfigured for the application
|
+-- providers         # all of the application providers
|
+-- api            # routes configuration
|
+-- utils             # shared utility functions
```
