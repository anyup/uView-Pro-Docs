---
title: Git 删除已推送的提交记录
---
# Git 删除已推送的提交记录

![Snipaste\_2024-11-21\_16-55-53.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/61be231d518e48d7934a65c7579b945b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732861912&x-orig-sign=7JospY6wrWHgcfY71e8Kjg8Wc6k%3D)

问题：如何在 `Git` 中删除已推送（`push`）的提交记录，因为我从来没这么操作过，所以关于如何实现，问了我身边的几个同事，他们都说实现不了。

从发现问题以来，如何解决真是令我头疼的事情，我一度想要重新建库。而现在解决问题后，我觉得真简单，还挺好玩的。那么问题来了，我为什么会有删除提交记录这个想法？且听我细细道来！

## 一. 背景

经常在 `Github` 和 `Gitee` 中做开源项目的人应该了解，`Gitee` 有一个“**仓库镜像管理功能**”，目的是支持在 `Gitee` 与其他代码托管平台（如 `Github`） 实现仓库数据的⾃动同步，包括代码提交、分⽀和标签。我主要是因为懒得在两个平台分别管理，所以我使用了这个功能，提交代码到 `Gitee`，再由“**仓库镜像管理功能**”同步到 `Github`。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/89a16161b3d94153985e688b65aa930c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732861912&x-orig-sign=tV2aP6YYQiJLedjbnBkJjKDrwyY%3D)

该功能在配置好之后，使用正常，所以最近一直没看提交记录。然而就在昨天查看 `Github` 仓库代码时发现，好多代码没有同步成功。所以我立即登录 `Gitee` 查看，发现确实是有好长时间同步失败了，原因大致提示我有大文件同步失败导致最终同步任务失败！

我确实是最近上传了一个大文件，179MB 左右，因此我进行如下的操作测试：

我立即删除了大文件，重新提交到 `Gitee`，然后再次通过“**仓库镜像管理功能**”手动同步，发现还是同样的原因，同步失败！

> 我陷入了沉思，这是为什么呢？明明都已经删除大文件，竟然还是提示有大文件？

后来我想了一下，这是因为，同步功能会包括所有的 `push` 记录，虽然现在最新的结果是删除了，但是由于提交记录，在某一个分支节点，仍然会存在提交记录，同时也会存在大文件！

> 我又开始了我的探索之旅，现在的我有很多疑问？

最终我又想到，如果我把这条提交记录给抹除掉（删除已推送（push）的提交记录），那么会不会同步成功呢？不到最后一刻，我还是对其持怀疑态度的。

最终实现方案是：我开始了我的探索，研究如何 “**删除已推送的 Git 提交记录**” ？幸运的是方案是可行的。因此，最终也解决了我 `Gitee` 的仓库同步问题！

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/0939019dcb6f4eeca9ef497475d8a108~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732861912&x-orig-sign=d2Q4Lb%2FZjz6I1DDO0KnzsBLZpwI%3D)

本篇文章记录方案，以增长经验，同时帮助遇到同样问题的小伙伴们。接下来我将介绍使用 `git rebase` 命令来实现这一目标。

## 二. 使用 `git rebase`

`git rebase` 命令可以将一个分支的更改应用到另一个分支上，同时保持线性的提交历史。通过交互式 rebase，你可以删除特定的提交。

**步骤如下：**

### 1. 切换到要修改的分支

```bash
git checkout <branch-name>
```

### 2. 找到提交哈希值

可以通过 `VSCode` 工具或在代码托管平台上查看，也可以通过 `Git` 命令进行查看：

```bash
git log --pretty=oneline
```

`--pretty=oneline`：表示以单行的形式显示每个提交，并且显示完整的 40 个字符的哈希值。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/595bb26240d140f98047f22134f39a5e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732861912&x-orig-sign=u5qFMgVB4saT50XuemcX1h3djAw%3D)

### 3. 启动交互式 rebase

```bash
git rebase -i HEAD~N
git rebase -i <commit-hash>
git rebase -i <commit-hash>^
```

其中:

*   `N` 是你想要修改的最近的提交数量。这将打开一个文本编辑器，列出这些提交。

*   `commit-hash` 是你想要修改的提交的哈希值，这将从该提交开始应用 rebase，不包含该提交。

*   `^` 是一个特殊字符，表示是否包含该提交。如果你想要从当前提交开始应用 rebase，你可以使用 `git rebase -i <commit-hash>^`。

### 4. 编辑提交列表

把要删除的 `commit` 的行前面的 `pick` 改为 `drop`，或者直接删除这一行也可以。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/c867569ac22243a4b0262988bba2db4d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732861912&x-orig-sign=4J%2FoIElumqtZ6tmfNLBnuHVCEsw%3D)

如下列几个关键字含义：

*   `pick`：保留该提交

*   `reword`：修改该提交的提交信息

*   `edit`：在该提交之后停止，以便进一步修改

*   `squash`：将该提交与前一个提交合并

*   `fixup`：将该提交与前一个提交合并，但不保留提交信息

*   `exec`：执行指定的 shell 命令

*   `drop`：删除该提交

### 5. 保存并关闭编辑器

保存并退出编辑器(按 esc，然后输入 :wq 后按回车键)，Git 将按照你的指令执行 rebase 操作，重新应用剩余的 commits

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/839ec77af1d642b19c398c8396c4b26a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732861912&x-orig-sign=l2J0h0IDUo%2BCtpEcl3xpzrlNREc%3D)

如果你改动的关联代码很少，换句话说，你提交完这个记录后，后续的代码都没有再对相关文件进行操作，那么你是幸运的，可以完美的删除该提交，但是如果后续 Git 提交产生关联代码较多，那么你可能都需要对其处理，还是具体情况具体分析吧

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e9c9a54edff34b5193806eab31fc1f0e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732861912&x-orig-sign=7VqE%2FG69ufVf00neb2sUe6Cqzbk%3D)

### 6. 强制推送更改到远程仓库

最重要的一步，如果上述都执行的很顺利，那么你可以强制推送更改到远程仓库，神奇的是，你会发现，你提交的操作记录确实被删除了。

```bash
git push --force
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b869c39adc764022b89e51e6659241c7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732861912&x-orig-sign=1z57mwjSeszhwts3QYph4tzQxO8%3D)

最终结果是：提交记录的确被删除了

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/eeae6b58601a4e288b71a26a32f5053f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732861912&x-orig-sign=yiaWv88ySXscOLIryMe6qRZClXQ%3D)

## 三. 其他方式

网上一搜，还有其他的方式，但是我未曾尝试过，感兴趣的可以尝试一下另外的方式：

### 方法一： 使用 `git reset`

`git reset` 命令可以将当前分支的指针移动到指定的提交，并可选择性地保留或丢弃工作目录中的更改。如果提交已经被推送到远程仓库，你可能需要强制推送更改。

**步骤如下：**

#### **1. 切换到要修改的分支**

```bash
git checkout <branch-name>
```

#### **2. 执行重置操作**

*   如果你想保留更改但不保留提交历史，可以使用混合重置：

    ```bash
    git reset --mixed HEAD~N
    ```

    其中 `N` 是你要回退的提交数量。

*   如果你希望完全删除这些更改，可以使用硬重置：

    ```bash
    git reset --hard HEAD~N
    ```

> 注意：硬重置会丢失未提交的更改，请谨慎使用。

#### **3. 强制推送更改到远程仓库**

```bash
git push --force
```

强制推送会覆盖远程仓库上的分支，因此请确保团队中的其他成员了解这一操作，以避免造成不必要的混乱。

### 方法二：使用 `git revert`

`git revert` 命令会创建一个新的提交来撤销指定的提交，而不会改变现有的提交历史。这种方法更为安全，因为它不会重写历史记录。

**步骤如下：**

#### 1. **找到要撤销的提交哈希值**

```bash
git log --pretty=oneline
```

#### 2. **执行回滚操作**

```bash
git revert <commit-hash>
```

这将创建一个新的提交，该提交的效果是撤销指定提交所做的更改。

#### 3. **推送新的提交到远程仓库**

```bash
git push origin <branch-name>
```

## 四. 注意事项

*   **备份分支**：在执行上述任何操作之前，强烈建议先创建一个备份分支或标签，以防万一需要恢复原始状态。

*   **团队沟通**：在多人协作的项目中，确保在进行重大更改前通知到团队相关成员。

*   **敏感信息**：对于包含敏感信息的提交，即使删除了提交记录，这些信息也可能已经通过其他途径泄露出去。因此，在处理这类情况时，还需要采取额外的安全措施，如更改密码或密钥等等。

## 五. 总结

在使用 `Git` 进行版本控制时，有时可能会遇到需要删除已经推送到远程仓库的提交记录的情况。这可能是由于提交中包含了敏感信息，或者只是为了清理项目的历史记录。

通过以上介绍的方法，相信可以根据实际情况选择最适合的方式来删除或撤销已推送的提交记录。无论采用哪种方法，都应谨慎行事，强烈建议重新创建一个测试分支来验证操作，以避免对整体项目或其他开发者的代码产生负面影响。

使用 `git reset` 可以快速删除提交，但会重写历史记录；使用 `git revert` 则更为安全，但会增加新的提交；使用 `git rebase` 可以灵活地编辑提交历史，但同样需要注意操作过程中的潜在问题。

