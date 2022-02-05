function MediaDevices()
{
    return(
    <div id="mediadevices">
    <select name="Camera" id="camerra">
    <option value="Use Default Camera">Use Default cam</option>
    <option value="External Camera">External cam</option>
    </select>

    <select name="Speaker" id="speaker">
    <option value="Use Default Speaker">Use Default Speaker</option>
    <option value="External Speaker">External Speaker</option>
    </select>

    <select name="Mike" id="mike">
    <option value="Use Default Mike">Use Default Mike</option>
    <option value="External Mike">External Mike</option>
    </select>
    </div>
      )
}

export default MediaDevices