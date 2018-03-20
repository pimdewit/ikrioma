# Model Logic

## Static Models

Static models are low-level, graphical geometries. These models have some rules:

Static models
- exist out of 1 or several meshes.
- are not affected by shaders
- can not be distorted in any way
- MUST contain 3 different quality versions (mainly for LOD)


### Example flow of a Static Model

```
+---------------+
|               |
|  StaticModel  |
|               |
+---------------+
      ^
      |              +-------------+
      |         +----|  MeshHighQ  |
      |         |    +-------------+
+-----+-----+   |
|           |   |    +-----------------+
|  LodMesh  |<--+----|  MeshStandardQ  |
|           |   |    +-----------------+
+-----------+   |
      ^         |    +------------+
      |         +----|  MeshLowQ  |
      |              +------------+
      |
      |
      |
      |              +-------------+
      +--------------|  Animation  |
      |              +-------------+
      |
      |
      |
      |              +-----------+
      +<-------------|  Texture  |
                     +-----------+
```
